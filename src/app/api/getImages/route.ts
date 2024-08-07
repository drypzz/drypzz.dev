import fs from 'fs';
import path from 'path';

import { NextResponse } from 'next/server';

import { Images } from '@/app/utils/image.props';

export async function GET() {
  try {
    const techsDirectory = path.join(process.cwd(), 'public/svg/techs');
    const toolsDirectory = path.join(process.cwd(), 'public/svg/tools');

    const techs: Images[] = fs.readdirSync(techsDirectory).map(file => ({
      src: `/svg/techs/${file}`,
      alt: file.split('.')[0],
      title: file.split('.')[0],
    }));

    const tools: Images[] = fs.readdirSync(toolsDirectory).map(file => ({
      src: `/svg/tools/${file}`,
      alt: file.split('.')[0],
      title: file.split('.')[0],
    }));

    return NextResponse.json([...techs, ...tools]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read directory' }, { status: 500 });
  }
};