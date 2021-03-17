export default class DesignManager {
    static DefaultStruct = {
        Name: "New Database",
        Entities: []
    }

    static DefaultEntity = {
        Name: "New Entity",
        Columns: []
    }

    static DefaultColumn = {
        Name: "New Column",
        Type: -1,
        Flags: -1
    }

    static Check() {
        let Checker = localStorage.getItem("CRUDGenerator.Design");

        if (Checker == null)
            return false;

        if (Checker.length == 0)
            return false;

        return true;
    }

    static Initialize() {
        let Init = this.DefaultStruct;

        localStorage.setItem("CRUDGenerator.Design", JSON.stringify(Init));

        return Init;
    }

    static Get() {
        if (this.Check()) {
            return JSON.parse(localStorage.getItem("CRUDGenerator.Design"));
        }
        else {
            return null;
        }
    }
}