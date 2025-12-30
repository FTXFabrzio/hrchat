import { IntentResult } from './types/chat-intent';
export declare class IntentClassifier {
    classify(message: string): IntentResult;
    private extractName;
    private normalize;
}
