const pdfParser = require('../utils/pdfParser');
const vectorService = require('../services/vectorService');
const prisma = require('../config/db');

exports.uploadResume = async (req, res) => {
    const text = await pdfParser.extractText(req.file.path);
    const vector = await vectorService.generateVector(text);

    const resume = await prisma.resume.create({
        data: { userId: req.user.id, text, vector, fileUrl: req.file.path }
    });

    res.json({ message: "Resume uploaded and processed", resume });
};
