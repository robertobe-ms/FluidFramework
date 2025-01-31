/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { TSchema, Type, ObjectOptions, Static } from "@sinclair/typebox";
import { SessionId } from "@fluidframework/id-compressor";
import { Brand, brandedNumberType } from "../util/index.js";
import {
	SessionIdSchema,
	RevisionTag,
	RevisionTagSchema,
	EncodedRevisionTag,
} from "../core/index.js";

/**
 * Contains a single change to the `SharedTree` and associated metadata.
 *
 * TODO: if this type is not used in the encoded format, move it out of this file, and stop using it in EncodedEditManager.
 * If this is an encoded format, clarify the difference between it and EncodedCommit.
 */
export interface Commit<TChangeset> {
	readonly revision: RevisionTag;
	readonly change: TChangeset;
	/** An identifier representing the session/user/client that made this commit */
	readonly sessionId: SessionId;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type EncodedCommit<TChangeset> = {
	readonly revision: EncodedRevisionTag;
	readonly change: TChangeset;
	readonly sessionId: SessionId;
};

const noAdditionalProps: ObjectOptions = { additionalProperties: false };

const CommitBase = <ChangeSchema extends TSchema>(tChange: ChangeSchema) =>
	Type.Object({
		revision: RevisionTagSchema,
		change: tChange,
		sessionId: SessionIdSchema,
	});
/**
 * @privateRemarks Commits are generally encoded from `GraphCommit`s, which often contain extra data.
 * This `noAdditionalProps` is especially important in that light.
 */
const Commit = <ChangeSchema extends TSchema>(tChange: ChangeSchema) =>
	Type.Composite([CommitBase(tChange)], noAdditionalProps);

export type SeqNumber = Brand<number, "edit-manager.SeqNumber">;
const SeqNumber = brandedNumberType<SeqNumber>({ multipleOf: 1 });

const SequenceId = Type.Object({
	sequenceNumber: SeqNumber,
	indexInBatch: Type.Optional(Type.Number({ multipleOf: 1, minimum: 0 })),
});

export type SequenceId = Static<typeof SequenceId>;

/**
 * A commit with a sequence number but no parentage; used for serializing the `EditManager` into a summary
 */
export interface SequencedCommit<TChangeset> extends Commit<TChangeset>, SequenceId {}

const SequencedCommit = <ChangeSchema extends TSchema>(tChange: ChangeSchema) =>
	Type.Composite([CommitBase(tChange), SequenceId], noAdditionalProps);

/**
 * A branch off of the trunk for use in summaries.
 *
 * TODO: if this type is not used in the encoded format, move it out of this file, and stop using it in EncodedEditManager.
 * If this is an encoded format, use EncodedCommit instead of Commit or clarify that Commit is also an encoded format.
 */
export interface SummarySessionBranch<TChangeset> {
	readonly base: RevisionTag;
	readonly commits: Commit<TChangeset>[];
}

export interface EncodedSummarySessionBranch<TChangeset> {
	readonly base: EncodedRevisionTag;
	readonly commits: Commit<TChangeset>[];
}
const SummarySessionBranch = <ChangeSchema extends TSchema>(tChange: ChangeSchema) =>
	Type.Object(
		{
			base: RevisionTagSchema,
			commits: Type.Array(Commit(tChange)),
		},
		noAdditionalProps,
	);

export interface EncodedEditManager<TChangeset> {
	readonly trunk: readonly Readonly<SequencedCommit<TChangeset>>[];
	readonly branches: readonly [SessionId, Readonly<EncodedSummarySessionBranch<TChangeset>>][];
	readonly version: typeof version;
}

export const version = 1.0;

export const EncodedEditManager = <ChangeSchema extends TSchema>(tChange: ChangeSchema) =>
	Type.Object(
		{
			version: Type.Literal(version),
			trunk: Type.Array(SequencedCommit(tChange)),
			branches: Type.Array(Type.Tuple([SessionIdSchema, SummarySessionBranch(tChange)])),
		},
		noAdditionalProps,
	);
