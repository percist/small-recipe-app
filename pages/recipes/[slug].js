import { 
  sanityClient,
  urlFor, 
  usePreviewSubscription,
  PortableText,
} from "../../lib/sanity"

const recipeQuery = `*[_type == "recipe" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  mainImage,
  ingredient[]{
    _key,
    unit,
    wholeNumber,
    fraction,
    ingredient->{
      name
    }
  },
  instructions
}`;

export default function OneRecipe({ data }) {
  const { recipe } = data;
  return (
    <article className="recipe">
      <h1>{recipe.name}</h1>
      <main className="content">
        <img alt={recipe.name} src={urlFor(recipe?.mainImage).url()}/>
        <div className="breakdown">
          <ul className="ingredients">
            {recipe.ingredient?.map((ingredient) => (
            <li className="ingredient" key={ingredient._key}>
              {ingredient?.wholeNumber}
              {ingredient?.fraction}
              {' '}
              {ingredient?.unit}
              <br />
              {ingredient?.ingredient?.name}
            </li>

            ))}
          </ul>
          <PortableText blocks={recipe?.instructions}/>
        </div>
      </main>
    </article>
  )
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type == "recipe" && defined(slug.current)]{
      "params": {
        "slug": slug.current
      }
    }`
  )
  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const recipe = await sanityClient.fetch(recipeQuery, { slug })
  return { props: { data: { recipe }}}
}