import { Request, Response } from 'express';
import * as purchaseService from '../services/purchaseService'; // Corrigir importação

export const createPurchase = async (req: Request, res: Response) => {
  try {
    const { itemId } = req.body;
    const userId = req.userId;

    console.log('createPurchase - userId:', userId, 'itemId:', itemId);

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const purchase = await purchaseService.createPurchase(userId, itemId); // Utilizando o serviço de compras
    res.status(201).json(purchase);
  } catch (error) {
    console.error('Erro ao criar compra:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getPurchasesByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const purchases = await purchaseService.getPurchasesByUser(userId); // Utilizando o serviço de compras
    res.json(purchases);
  } catch (error) {
    console.error('Erro ao obter compras:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
