export default function debug(module: string, ...msg: unknown[]) {
    if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(`%c[${module}]:`, 'color: #0484d9', `${JSON.stringify(msg)}`);
    }
}
