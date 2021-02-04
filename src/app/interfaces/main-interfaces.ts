export interface Freestyler {
    _id: string;
    nombre: string;
    pais: string;
    imgUrl: string;
    __v: number;
}

    export interface Apuesta {
        _id: String;
        leftFreestyler: Freestyler;
        rightFreestyler: Freestyler;
        leftPoints: number;
        rightPoints: number;
        finishDate: number;
        organization: string;
        __v: number;
    }
