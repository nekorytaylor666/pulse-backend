import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'nestjs-prisma';
import { AppointmentCreateInput } from 'src/@generated/appointment/appointment-create.input';
import { Appointment } from 'src/@generated/appointment/appointment.model';

@Resolver()
export class AppointmentsResolver {
  // inject prisma service here
  private readonly prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  @Query(() => Appointment)
  async appointment(): Promise<Appointment> {
    return await this.prisma.appointment.findFirst({ where: { id: '1' } });
  }

  @Mutation(() => Appointment)
  async createAppointment(
    @Args('create', { type: () => AppointmentCreateInput })
    args: AppointmentCreateInput
  ): Promise<Appointment> {
    return this.prisma.appointment.create({ data: { ...args } });
  }
}
