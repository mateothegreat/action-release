export async function wait(ms: number) {
    return new Promise(r => setTimeout(r, ms));
}

export const semanticSort = (key?: string) => (a: any, b: any) => {

    let a1;
    let b1;

    if (key) {

        a1 = a[ key ].split('.');
        b1 = b[ key ].split('.');

    } else {

        a1 = a.split('.');
        b1 = b.split('.');

    }

    const len = Math.min(a1.length, b1.length);

    for (let i = 0; i < len; i++) {

        const a2 = +a1[ i ] || 0;
        const b2 = +b1[ i ] || 0;

        if (a2 !== b2) {

            return a2 > b2 ? 1 : -1;

        }

    }

    return b1.length - a1.length;

};
