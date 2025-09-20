import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BoxService } from './box.service';
import { EmpacotamentoInputDto } from './dto/empacotamento-input.dto';
import { EmpacotamentoOutputDto } from './dto/empacotamento-output.dto';

@ApiTags('box')
@Controller('box')
export class BoxController {
  constructor(private readonly boxService: BoxService) {}

  @Post('pack')
  @ApiOperation({
    summary: 'Empacota pedidos em caixas otimizadas',
    description:
      'Recebe uma lista de pedidos e retorna como devem ser empacotados em caixas para otimizar o espaço',
  })
  @ApiResponse({
    status: 200,
    description: 'Pedidos empacotados com sucesso',
    type: EmpacotamentoOutputDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados de entrada inválidos',
  })
  packOrders(@Body() input: EmpacotamentoInputDto): EmpacotamentoOutputDto {
    const pedidosEmpacotados = this.boxService.packOrders(input.pedidos);
    return { pedidos: pedidosEmpacotados };
  }
}
