import { NumberLiteralType } from "typescript";

export interface Size {
  height: number;
  type: string;
  width: number;
  url: string;
}

export interface Photo {
  album_id: number;
  date: number;
  id: number;
  owner_id: number;
  access_key: string;
  sizes: Size[];
  text: string;
  user_id: number;
}

export interface Video {
  access_key: string;
  can_comment: number;
  can_edit: number;
  can_like: number;
  can_repost: number;
  can_subscribe: number;
  can_add_to_faves: number;
  can_add: number;
  can_attach_link: number;
  comments: number;
  date: number;
  description: string;
  duration: number;
  photo_130: string;
  photo_320: string;
  photo_800: string;
  photo_1280: string;
  first_frame_130: string;
  first_frame_160: string;
  first_frame_320: string;
  first_frame_800: string;
  first_frame_1280: string;
  width: number;
  height: number;
  id: number;
  owner_id: number;
  title: string;
  track_code: string;
  views: number;
}

export interface Attachment {
  type: string;
  photo: Photo;
  video: Video;
  market_album?: market;
}

export interface market {
  photo: Photo;
}

export interface Comments {
  count: number;
}

export interface Likes {
  can_like: number;
  count: number;
  user_likes: number;
}

export interface Reposts {
  count: number;
  wall_count: number;
  mail_count: number;
}

export interface Views {
  count: number;
}

export interface Item {
  id: number;
  from_id: number;
  owner_id: number;
  date: number;
  postponed_id: number;
  marked_as_ads: number;
  can_delete: number;
  post_type: string;
  text: string;
  can_edit: number;
  created_by: number;
  can_pin: number;
  is_pinned: number;
  attachments: Attachment[];
  comments: Comments;
  likes: Likes;
  reposts: Reposts;
  views: Views;
  hash: string;
}

export interface StatResult {
  likes: number;
  views: number;
  comments: number;
  reposts: number;
}

export interface Group {
  id: number;
  name: string;
  screen_name: string;
  is_closed: number;
  type: string;
  is_admin: number;
  is_member: number;
  is_advertiser: number;
  photo_50: string;
  photo_100: string;
  photo_200: string;
  members_count: number;
}

export interface TstatsGroup {
  count: number;
  items: Item[];
  error: string;
  isLoading: boolean;
  result: StatResult;
  groups: Group[];
}

export interface Tmembers {
  count: number;
  isLoading: boolean;
  error: string;
}

export interface TselectInputGroup {
  id?: number;
  name?: string;
  dateStart?: string;
  dateEnd?: string;
  isFavourite?: boolean;
}
