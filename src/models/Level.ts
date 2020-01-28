import { types } from 'mobx-state-tree';

import Entity from 'src/models/Entity';
import IPoint from 'src/types/point';

const Level = types.model({
	timings: types.refinement(
		types.array(types.integer),
		(value) => value !== undefined && value.length === 2
	),
	entities: types.map(Entity),
	entityIdCounter: 0,
}).actions((self) => ({
	set2StarsTime(ms: number): void {
		self.timings[0] = ms;
	},
	set3StarsTime(ms: number): void {
		self.timings[1] = ms;
	},
	deleteEntity(id: string): void {
		self.entities.delete(id);
	},
}));

type SerializedLevel = {
	timings: Array<number>; // TODO: make this a [number, number]
	entities: Array<{
		type: string;
		params: {
			vertices: Array<IPoint>;
		};
	}>;
};

const LevelProcessor = types.snapshotProcessor(Level, {
	// from instance to snapshot
	postProcessor({ entityIdCounter, ...sn}): SerializedLevel {
		const level = {
			...sn,
			entities: Object.values(sn.entities).map(({ id, ...params }) => ({
				...params,
			})),
		};
		return level;
	},
});

export default LevelProcessor;