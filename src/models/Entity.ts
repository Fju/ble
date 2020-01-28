import { types, Instance } from 'mobx-state-tree';
import { Point as PixiPoint } from 'pixi.js';

import Point from 'src/models/Point';
import { EntityType } from 'src/types/entity';

const Entity = types.model({
	id: types.identifier,
	type: types.enumeration(Object.values(EntityType)),
	params: types.model({
		vertices: types.array(Point),
		isStatic: types.boolean,
	}),
}).actions((self) => ({
	move(deltaX: number, deltaY: number): void {
		self.params.vertices.map((vertex) => {
			vertex.set(
				vertex.x + deltaX,
				vertex.y + deltaY,
			);
		});
	},
	deleteVertex(index: number): void {
		self.params.vertices.splice(index, 1);
	},
	setIsStatic(isStatic: boolean): void {
		self.params.isStatic = isStatic;
	},
})).views((self) => ({
	get verticesAsPixiPoints(): Array<PixiPoint> {
		return self.params.vertices.map(({ x, y }) => new PixiPoint(x, y));
	},
}));
export default Entity;
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IEntity extends Instance<typeof Entity> {}