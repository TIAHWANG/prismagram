import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

const verifyUser = async (payload, done) => {
    try {
        const user = await prisma.user({ id: payload.id });
        if (user !== null) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
};

// get the user from verifyUser function and then attach user to req if user exists
export const authenticateJwt = (req, res, next) =>
    passport.authenticate("jwt", { sessions: false }, (error, user) => {
        if (user) {
            req.user = user;
        }
        next();
    })(req, res, next); // [function](req,res,next) => graphql 실행

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();
