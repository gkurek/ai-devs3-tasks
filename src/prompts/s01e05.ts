const createPrompt = (sentence: string) => `
Anonymise sensitive data in the provided sentence. Sensitive data is considered when it is: name, surname, city, street, age. For each sensitive information, instead original text write: CENZURA. Answer ONLY with anonymised sentence. No other text or comments.
<example>
input_sentence: "Podejrzany: Krzysztof Kwiatkowski. Mieszka w Szczecinie przy ul. Różanej 12. Ma 31 lat."
output_sentence: "Podejrzany: CENZURA. Mieszka w CENZURA przy ul. CENZURA. Ma CENZURA lat."
</example>

<provided_sentence>
${sentence}
</provided_sentence>
`;

export default createPrompt;
