import {PDFDocument, StandardFonts, rgb, PDFPage, PDFFont} from 'pdf-lib';
import { v4 as uuidv4 } from 'uuid';

export async function generatePDF(usuario: string, notas: number[], comentario: string): Promise<Blob> {
  const pdfDoc: PDFDocument = await PDFDocument.create();
  const page: PDFPage = pdfDoc.addPage([600, 400]); // Tamanho da página em modo retrato

  // Carrega a fonte padrão
  const font: PDFFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Obtém as dimensões da página
  const { width, height } = page.getSize();
  const fontSize: number = 12;
  const margin: number = 50;

  // Gera uma chave única e obtém a data/hora atual
  const chave = uuidv4();
  const dataHora: string = new Date().toLocaleString();

  // Adiciona o título do documento
  page.drawText('Documento Oficial de Avaliação', {
    x: margin,
    y: height - margin,
    size: fontSize + 4,
    font,
    color: rgb(0, 0, 0),
  });

  // Adiciona o nome do professor
  page.drawText(`Professor: ${usuario}`, {
    x: margin,
    y: height - margin - 30,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });

  // Adiciona as notas
  page.drawText(`Notas: ${notas.join(', ')}`, {
    x: margin,
    y: height - margin - 60,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });

  // Adiciona o comentário
  page.drawText(`Comentário: ${comentario}`, {
    x: margin,
    y: height - margin - 90,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });

  // Adiciona a assinatura na lateral direita (como um carimbo)
  const assinaturaX = width - 150; // Posição X da assinatura
  const assinaturaY = 100; // Posição Y da assinatura

  page.drawText(`Assinado por: ${usuario}`, {
    x: assinaturaX,
    y: assinaturaY,
    size: fontSize - 2,
    font,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Data e Hora: ${dataHora}`, {
    x: assinaturaX,
    y: assinaturaY - 20,
    size: fontSize - 2,
    font,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Chave: ${chave}`, {
    x: assinaturaX,
    y: assinaturaY - 40,
    size: fontSize - 2,
    font,
    color: rgb(0, 0, 0),
  });

  // Adiciona uma moldura ao redor da assinatura (opcional)
  page.drawRectangle({
    x: assinaturaX - 10,
    y: assinaturaY - 50,
    width: 140,
    height: 70,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1,
  });

  // Salva o PDF e converte para Blob
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

