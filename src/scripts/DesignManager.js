export default class DesignManager {
    static NewStruct() {
        return {
            Name: "NewDatabase",
            Entities: []
        };
    }

    static NewEntity() {
        return {
            Name: "NewEntity",
            Columns: []
        };
    }

    static NewColumn() {
        return {
            Name: "NewColumn",
            Type: -1,
            Flags: -1
        };
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
        let Init = this.NewStruct();

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