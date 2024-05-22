export const SERVICE_TAG = 'SERVICE';
export const CLUSTER_TAG = "CLUSTER";
export const INSTANCE_TAG = "INSTANCE";
export const APPLICATION_TAG = "APPLICATION";
export const ROUTE_TAG = "ROUTE";
export const IMAGE_TAG = "IMAGE";

export const SEARCHLIST_FLAG = "SEARCHLIST";
export const PAGE_NUM_FLAG = "PAGE_NUM";
export const PAGE_SIZE_FLAG = "PAGE_SIZE";
export const ORDER_FLAG = "ORDER";
export const ORDER_BY_FLAG = "ORDER_BY";

export const PAGE_MODULES = {
  SERVICE_TAG: SERVICE_TAG,
  CLUSTER_TAG: CLUSTER_TAG,
  INSTANCE_TAG: INSTANCE_TAG,
  APPLICATION_TAG: APPLICATION_TAG,
  ROUTE_TAG: ROUTE_TAG,
  IMAGE_TAG: IMAGE_TAG
};

const PARAM = [
  SEARCHLIST_FLAG,
  PAGE_NUM_FLAG,
  PAGE_SIZE_FLAG,
  ORDER_FLAG,
  ORDER_BY_FLAG
]

export const resetLocalStoragePageTag = (module_tag) => {
  for(const tag in PAGE_MODULES) {
    if(tag !== module_tag) {
      for(const flag of PARAM) {
        localStorage.removeItem(`${PAGE_MODULES[tag]}_${flag}`);
      }
    }
  }
}
