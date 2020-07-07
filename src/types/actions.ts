import IPoint from 'src/types/point';
import { interaction } from 'pixi.js';

export type Actions = {
	type: 'entityPointerDown';
	entityId: string;
	ev: interaction.InteractionEvent;
} | {
	type: 'vertexPointerDown';
	entityId: string;
	vertexId: string;
	ev: interaction.InteractionEvent;
} | {
	type: 'addVertex';
	pos: IPoint;
} | {
	type: 'createEntity';
	pos: IPoint;
} | {
	type: 'backgroundPointerDown';
	ev: interaction.InteractionEvent;
} | {
	type: 'zoom';
	factor: number;
};
