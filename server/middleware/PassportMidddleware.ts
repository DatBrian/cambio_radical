import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UsuarioModel } from '../model/UsuarioModel';

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, async (username, password, done) => {
  try {
    const user = await UsuarioModel.findOne({ username });
    if (!user) {
      return done(null, false, { message: 'Usuario no encontrado' });
    }

    const isPasswordMatch = await user.schema.methods.matchPassword(password);
    if (isPasswordMatch) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Contraseña incorrecta' });
    }
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user:any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UsuarioModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});