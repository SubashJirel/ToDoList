import './styles.css';
import dom from './dom';
import { createEventListener } from './eventListeners';

dom.showMainTitle(0);
dom.showProjects();
dom.getTasks('all');
createEventListener();
