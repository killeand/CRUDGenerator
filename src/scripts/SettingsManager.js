export default class SettingsManager {
    static Check() {
        let Checker = localStorage.getItem("CRUDGenerator.Settings");

        if (Checker == null)
            return false;

        if (Checker.length == 0)
            return false;

        return true;
    }

    static Initialize() {
        let Init = {
            Version: "v1.0",
            Schema: "dbo",
            SchemaSeperator: "."
        }

        localStorage.setItem("CRUDGenerator.Settings", JSON.stringify(Init));

        return Init;
    }

    static Get() {
        if (this.Check()) {
            return JSON.parse(localStorage.getItem("CRUDGenerator.Settings"));
        }
        else {
            return null;
        }
    }
}