import { setAccessToken } from '@tager/admin-services';
import '../src/assets/css/index.css';

const accessToken = process.env.VUE_APP_ACCESS_TOKEN;

if (accessToken) {
  setAccessToken(accessToken);
}
