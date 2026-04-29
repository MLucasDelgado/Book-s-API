import 'reflect-metadata';
import { AppDataSource } from './data-source';
import { seedBooks } from './seeds/books.seed';

async function runSeed() {
  await AppDataSource.initialize();

  await seedBooks(AppDataSource);

  await AppDataSource.destroy();
}

runSeed();