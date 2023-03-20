export interface ILoadedScript {
    remove(): void;
}

export function loadScript(
    url: string, params?: string | [string, string][] | URLSearchParams | null,
    scriptElementOptions: Partial<HTMLScriptElement> = {
        async: true,
        defer: true,
    },
): Promise<ILoadedScript> {
    return new Promise<ILoadedScript>((success, error) => {
        const scriptElement: HTMLScriptElement = document.createElement("script");
        scriptElement.type = "text/javascript";
        Object.assign(scriptElement, scriptElementOptions);
        scriptElement.addEventListener("load", () => {
            success({
                remove(): void {
                    document.body.removeChild(scriptElement);
                },
            });
        });
        scriptElement.addEventListener("error", error);

        scriptElement.src = `${ url }${ params ? `?${ new URLSearchParams(params).toString() }` : "" }`;

        document.body.appendChild(scriptElement);
    });
}
