import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from 'next-connect';
import multer from 'multer';
import prisma from '../../../lib/prisma';

const upload = multer ({
    storage: multer.diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => cb(null,file.originalname),
    }),
})

type NextApiRequestWithFormData = NextApiRequest &
  Request & {
    files: any[];
  };

const apiRoute = nextConnect<NextApiRequestWithFormData, NextApiResponse>({
    onError(error, req, res) {
      res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
  });

  apiRoute.use(upload.array('images'));

  apiRoute.post(async (req, res) => {
    const { files, body } = req;
    console.log(body.type)

    const result = await prisma.gallery.create({
      data: {
        title: files[0].originalname.substring(0, files[0].originalname.length - 4),
        url: files[0].path.substring(files[0].path.indexOf('/') + 1),
        type: body.type,
      },
    });
    res.json(result);
  });

export default apiRoute;

export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
  };