import resolver from './helpers/resolver';
import { setResolver } from 'ember-qunit';
setResolver(resolver);

QUnit.config.testTimeout = 4000;

