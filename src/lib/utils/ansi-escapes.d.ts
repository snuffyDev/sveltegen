declare interface ansiEscapes {
    cursorTo(x: any, y: any): string;
    cursorMove(x: any, y: any): string;
    cursorUp(count?: number): string;
    cursorDown(count?: number): string;
    cursorForward(count?: number): string;
    cursorBackward(count?: number): string;
    cursorLeft: string;
    cursorSavePosition: string;
    cursorRestorePosition: string;
    cursorGetPosition: string;
    cursorNextLine: string;
    cursorPrevLine: string;
    cursorHide: string;
    cursorShow: string;
    eraseLines(count: any): string;
    eraseEndLine: string;
    eraseStartLine: string;
    eraseLine: string;
    eraseDown: string;
    eraseUp: string;
    eraseScreen: string;
    scrollUp: string;
    scrollDown: string;
    clearScreen: string;
    clearTerminal: string;
    beep: typeof BEL;
    link(text: any, url: any): string;
    image(buffer: any, options?: {}): string;
    iTerm: {
        setCwd(cwd?: any): string;
        annotation(message: any, options?: {}): string;
    };
}
declare const BEL: "\u0007";
