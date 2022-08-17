import type { FetchStatus } from "@tager/admin-services";
import { Scopes } from "@tager/admin-services";

import { LinkTypeWithScopes } from "../../typings/common";

export interface NavigationGridItem {
  name: string;
  url?: string;
  total?: { status: FetchStatus; value: number; url?: string };
  linkList?: Array<LinkTypeWithScopes>;
  width?: number;
  scopes?: Scopes;
}
