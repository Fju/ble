import { types, Instance } from 'mobx-state-tree';

import Editor from 'src/models/Editor';
import LevelProcessor from 'src/models/LevelProcessor';
import { EntityType, BlockType } from 'src/types/entity';
import { EditorMode } from 'src/types/editor';
import Block from 'src/models/Block';
import Door from 'src/models/Door';
import IPoint from 'src/types/point';

const RootStore = types.model({
	editor: types.optional(Editor, {
		position: {
			x: 0,
			y: 0,
		},
		mode: EditorMode.select,
		addType: EntityType.normal,
	}),
	level: types.optional(LevelProcessor, {
		timings: [0, 0],
		entities: [
			{
				type: 'normal',
				params: {
					vertices: [
						{ x: 60, y: 60 },
						{ x: 60, y: 120 },
						{ x: 120, y: 120 },
						{ x: 120, y: 60 },
					],
					isStatic: false,
				},
			},
			{
				type: 'ice',
				params: {
					vertices: [
						{ x: 120, y: 300 },
						{ x: 120, y: 360 },
						{ x: 240, y: 360 },
						{ x: 240, y: 300 },
						{ x: 180, y: 240 },
					],
					isStatic: true,
				},
			},
			{
				type: 'endpoint',
				params: {
					x: 300,
					y: 0,
				},
			},
			{
				type: 'player',
				params: {
					x: 0,
					y: 300,
					magazine: [],
				},
			},
		],
	}),
}).actions((self) => ({
	addEntity(pos: IPoint): void {
		const id = self.level.entityIdCounter.toString(10);
		let entity = null;

		if (self.editor.addType in BlockType) {
			entity = Block.create({
				id,
				type: self.editor.addType as unknown as BlockType,
				params: {
					vertices: [
						pos,
					],
					isStatic: true,
				},
			});
		}

		if (self.editor.addType === EntityType.endpoint) {
			entity = Door.create({
				id,
				type: EntityType.endpoint,
				params: {
					x: pos.x,
					y: pos.y,
				},
			});
		}

		if (entity !== null) {
			self.level.entities.set(id, entity);
			self.editor.selectedEntity = entity;
			self.level.entityIdCounter += 1;
		}
	},
}));
export const store = RootStore.create();
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRootStore extends Instance<typeof RootStore> {}
