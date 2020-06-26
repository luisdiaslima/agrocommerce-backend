import { Router } from 'express';
import UsuarioController from '../controllers/UsuarioController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();


router.get('/', loginRequired, UsuarioController.index);
router.get('/:id', UsuarioController.show);
router.post('/', UsuarioController.store);
router.put('/:id', UsuarioController.update);
router.delete('/:id', UsuarioController.delete);

export default router;
