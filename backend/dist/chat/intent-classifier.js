"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntentClassifier = void 0;
class IntentClassifier {
    classify(message) {
        const normalized = this.normalize(message);
        if (normalized.includes('donde trabaja')) {
            const name = this.extractName(normalized);
            return {
                intent: 'EMPLOYEE_LOCATION',
                entities: { employeeName: name },
            };
        }
        return { intent: 'UNKNOWN', entities: {} };
    }
    extractName(message) {
        const match = message.match(/donde trabaja\s+([a-z\s]+)/i);
        if (!match) {
            return undefined;
        }
        return match[1].trim();
    }
    normalize(value) {
        return value
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z\s]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }
}
exports.IntentClassifier = IntentClassifier;
//# sourceMappingURL=intent-classifier.js.map