import { setupAxios } from "./helpers/browser";


// Run setup if in browser environment
if (typeof window !== "undefined") {
  setupAxios();
}


export {AntonSDK} from "./models/factory";

