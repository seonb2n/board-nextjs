export default class Room {

    id: number;
    hashtags: string[];
    title: string;
    subtitle: string;
    comments: string[];
    iconurl: string;

    constructor(id, hashtags, title, subtitle, comments, iconurl) {
        this.id = id;
        this.hashtags = hashtags;
        this.title = title;
        this.subtitle = subtitle;
        this.comments = comments;
        this.iconurl = iconurl;
    }
}