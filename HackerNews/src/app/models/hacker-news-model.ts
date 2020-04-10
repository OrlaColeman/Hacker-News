export class Story {
    by: string;
    descendants: number;
    id: number;
    kids: [];
    score: number;
    time: number;
    title: string;
    type: types;
    url: string;

    constructor(by: string, descendants: number, id: number, kids: [], score: number, time: number, title: string, type: types, url: string){
        this.by = by;
        this.descendants = descendants;
        this.id = id;
        this.kids = kids;
        this.score = score;
        this.time = time;
        this.title = title;
        this.type = type;
        this.url = url;
    }
}

export class types {
    comment = "comment";
    story = "story";
}