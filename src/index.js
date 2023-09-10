import './styles.css';
import dom from './dom';
import { createEventListener } from './eventListeners';

dom.showProjects();
dom.getTasks('all');
createEventListener();
