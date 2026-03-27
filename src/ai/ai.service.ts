import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { EquipmentService } from '../equipment/equipment.service';

@Injectable()
export class AiService {
  private client: OpenAI;

  constructor(private equipmentService: EquipmentService) {
    this.client = new OpenAI({
      apiKey: process.env.LITELLM_API_KEY || 'sk-placeholder',
      baseURL: process.env.LITELLM_BASE_URL || 'http://localhost:4000',
    });
  }

  async recommendEquipment(activity: string): Promise<string> {
    const equipmentList = await this.equipmentService.findAll(undefined, true);

    const catalogText = equipmentList
      .map(
        (e) =>
          `Nom: ${e.name}, Sport: ${e.sport}, Catégorie: ${e.category}, Quantité: ${e.quantity}, Description: ${e.description || 'N/A'}`
      )
      .join('\n');

    const response = await this.client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Tu es un assistant sportif expert. Voici le catalogue actuel d'équipements :\n${catalogText}\nRecommande à l'utilisateur le matériel le plus adapté à son activité. Réponds uniquement avec le nom et la quantité recommandée de chaque équipement, en français.`,
        },
        { role: 'user', content: activity },
      ],
      max_tokens: 300,
    });

    return response.choices[0].message.content || '';
  }
}