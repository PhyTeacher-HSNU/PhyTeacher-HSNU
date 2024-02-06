//https://www.base64-image.de/
var pics={};

//四周牆壁
pics.wallSide="data:image/png;base64,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";

pics.wallU="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAIAAAB7GkOtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABZtJREFUeNrs1TEBAAAEAEH0LyAtHazuIvzyGT0BwD8lAYABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAgAFIAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAA3K8AAtewFmFmljNYAAAAASUVORK5CYII=";

pics.wallD="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAIX0lEQVR4Xu3WMQGAMADEwC/a8G+JLrjI3RILOXv3DQBIef4CACEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAECQAQCAIAMAAEEGAACCDAAABBkAAAgyAAAQZAAAIMgAAEDOdgGTwwVDKGd6BwAAAABJRU5ErkJggg==";

pics.logo="data:image/png;base64,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";

pics.ground="data:image/png;base64,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";

pics.ball='data:image/png;base64,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';