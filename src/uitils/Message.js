export default class Message {
    constructor(text, type) {
        this.id = new Date().getTime().toString()
        this.text = text;
        this.type = type;
    }
}
