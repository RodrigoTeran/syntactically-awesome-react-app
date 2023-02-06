declare module '*.png';
declare module '*.svg';
declare module "*.module.css" {
    const classes: Record<string, string>;
    export default classes;
}