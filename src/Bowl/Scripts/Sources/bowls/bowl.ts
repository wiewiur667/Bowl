export class Bowl {

    constructor(obj?: any) {

        if (obj !== null) {
            for (var prop in obj) {

                if (obj[prop] !== null) {
                    this[prop] = obj[prop];
                }
            }
        }
    }

    public id: number = 0;
    public bowlId: number = 0;
    public name: string = "Not assigned";
    public location: string = "Not assigned";
    public foodName: string = "Not assigned";
    public foodAmount: number = 0.00;
    public foodAlert: number = 0.00;
    public open: boolean = false;
    public distributing: boolean = false;
}