/** Import and re-export all icons, making them easier to import */
// ? bad practice?
import { ReactComponent as Add } from './add.svg';
import { ReactComponent as Reload } from './reload-outline.svg';
import { ReactComponent as Remove } from './remove-outline.svg';

export const ReloadIcon = Reload;
export const AddIcon = Add;
export const RemoveIcon = Remove;
