import { FetchStatus } from "@tager/admin-services";

import { LinkType } from "../../typings/common";

export interface NavigationGridItem {
  name: string;
  url?: string;
  total?: { status: FetchStatus; value: number; url?: string };
  linkList?: Array<LinkType>;
  width?: number;
}
