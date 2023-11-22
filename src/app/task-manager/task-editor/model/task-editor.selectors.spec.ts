import * as fromTaskEditor from './task-editor.reducer';
import { selectTaskEditorState } from './task-editor.selectors';

describe('TaskEditor Selectors', () => {
  it('should select the feature state', () => {
    const result = selectTaskEditorState({
      [fromTaskEditor.taskEditorFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
