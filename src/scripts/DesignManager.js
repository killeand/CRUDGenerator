export default class DesignManager {
    static DefaultStruct = {
        Name: "NewDatabase",
        Entities: []
    }

    static DefaultEntity = {
        Name: "NewEntity",
        Columns: []
    }

    static DefaultColumn = {
        Name: "NewColumn",
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

    static Save(jsondata) {
        localStorage.setItem("CRUDGenerator.Design", JSON.stringify(jsondata));
    }
}