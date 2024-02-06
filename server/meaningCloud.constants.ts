export type SentimentSentence = {
    agreement: string,
    bop: string,
    confidence: string,
    endp: string,
    inip: string,
    score_tag: ScoreType,
    segment_list: [],
    sentimented_concept_list: [],
    sentimented_entity_list: [],
    text: string
}

export enum ScoreType {
    "P+" = 2,
    "P" = 1,
    "NEU" = 0,
    "N" = -1,
    "N+" = -2,
    "NONE" = 0
}

export type SentimentConcept = {
    form: string,
    id: string,
    score_tag: ScoreType,
    type: string,
}

export type SentimentEntity = {
    form: string,
    id: string,
    score_tag: ScoreType,
    type: string,
}

export type SentimentResponse = {
    agreement: string,
    confidence: string,
    irony: string,
    model: string,
    score_tag: string,
    sentence_list: SentimentSentence[],
    sentimented_concept_list: SentimentConcept[],
    sentimented_entity_list: SentimentEntity[],
}