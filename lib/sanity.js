import { 
  createClient,
  createPreviewSubscriptionHook,
  createImageUrlBuilder,
  createPortableTextComponent
} from "next-sanity";

const config = {
  projectId: "1mp5d7zd",
  dataset: "production",
  apiVersion: "2021-06-01",
  useCdn: false,

}

export const sanityClient = createClient(config)

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

export const urlFor = (source)=> createImageUrlBuilder(config).image(source);

export const PortableText = createPortableTextComponent({
  ...config,
  serializers: {},
})