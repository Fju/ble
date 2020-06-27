import IPoint from 'src/types/point';
import { InteractionEvent } from 'pixi.js';

export type Actions = {
	type: 'entityPointerDown';
	entityId: string;
	ev: InteractionEvent;
} | {
	type: 'vertexPointerDown';
	entityId: string;
	vertexId: string;
	ev: InteractionEvent;
} | {
	type: 'addVertex';
	pos: IPoint;
} | {
	type: 'createEntity';
	pos: IPoint;
} | {
	type: 'backgroundClick';
	ev: InteractionEvent;
} | {
	type: 'zoom';
	factor: number;
};
