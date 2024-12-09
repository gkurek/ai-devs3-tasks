const createPrompt = (sentence: string) => `
Zanalizuj ponizszy tekst, podaj proszę nazwę ulicy, na której znajduje się uczelnia (konkretny instytut!), gdzie wykłada profesor Andrzej Maj. Jeśli w tekście odnajdziesz tylko częściowe dane (nazwa instytutu), użyj ich aby przeszukać intenet i znaleźć nazwę ulicy. w odpowiedzi podaj TYLKO nazwę ulicy i numer
<text_start>
${sentence}
</text_end>
`;

export default createPrompt;
