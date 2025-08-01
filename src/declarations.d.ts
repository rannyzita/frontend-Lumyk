declare module "*.svg" {
    import React from "react";
    import { SvgProps } from "react-native-svg";
    const content: React.FC<SvgProps>;
    export default content;
};

declare module "*.png" {
    const value: string;
    export default value;
}

declare module '@env' {
    export const ID_CLIENT: string;
    export const ID_FACEBOOK: string;
    export const redirectUri: string;
}
