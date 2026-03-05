class DeleteSubjectUseCase:
    def __init__(self, subject_repository):
        self.subject_repo = subject_repository

    def execute(self, subject_id):
        if not self.subject_repo.get_by_id(subject_id):
            raise ValueError("subject not found")

        self.subject_repo.delete_by_id(subject_id)
        