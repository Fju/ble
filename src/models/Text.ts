import { types, Instance, getParent, ISimpleType, IMaybe } from 'mobx-state-tree';
import { nanoid } from 'nanoid';
import languages from 'iso-639-1';

import { ILevel } from 'src/models/Level';

const l18nObj = languages.getAllCodes().reduce((acc, code) => {
	acc[code] = types.maybe(types.string);
	return acc;
}, {} as { [index: string]: IMaybe<ISimpleType<string>> });

const Text = types.model({
	id: types.optional(types.identifier, nanoid),
	type: types.literal('text'),
	params: types.model({
		x: types.number,
		y: types.number,
		isSelected: true,
		copy: types.optional(types.model(l18nObj), {
			en: 'Some text\nand a new line',
		}),
		anchor: types.optional(types.model({
			x: types.number,
			y: types.number,
		}), {
			x: 0.5,
			y: 0.5,
		}),
	}),
}).actions((self) => ({
	move(deltaX: number, deltaY: number): void {
		self.params.x += deltaX;
		self.params.y += deltaY;
	},
	remove(): void {
		const parent = (getParent(self, 2) as ILevel);
		parent.removeEntity(self as IText);
	},
	setCopy(lang: string, copy: string): void {
		self.params.copy[lang] = copy;
	},
	removeLang(lang: string): void {
		self.params.copy[lang] = undefined;
	},
})).views(() => ({
	get displayName(): string {
		return 'Text';
	},
}));
export default Text;
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IText extends Instance<typeof Text> {}